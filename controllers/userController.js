const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
  register: async (request, reply) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
      .options({
        allowUnknown: false,
      })
      .required();

    const validate = await schema.validate(request.body);

    if (validate.error) {
      return reply.status(400).send({
        message: validate.error.message,
      });
    }

    try {
      const { email, password, name } = request.body;

      const user = await User.findOne({ email });

      if (user) {
        return reply.status(409).send({
          message: "Email already exist",
        });
      }

      const hashPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_OUR_ROUNDS)
      );

      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });

      const result = await newUser.save();

      return reply.send({
        message: "success",
        data: result,
      });
    } catch (error) {
      return reply.status(500).send({
        message: error.message,
      });
    }
  },

  login: async (request, reply) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
      .options({
        allowUnknown: false,
      })
      .required();

    const validate = await schema.validate(request.body);

    if (validate.error) {
      return reply.status(400).send({
        message: validate.error.message,
      });
    }

    try {
      const { email, password } = request.body;
      const user = await User.findOne({
        email: email,
      });

      const passwordVerified = await bcrypt.compare(password, user.password);

      if (!user || !passwordVerified) {
        return reply.status(400).send({
          message: "Invalid email or password",
        });
      }

      const payload = {
        sub: user._id,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);
      const profile = await User.findById(user._id).select("-password");

      return reply.send({
        message: "success",
        data: {
          accessToken: token,
          user: profile,
        },
      });
    } catch (error) {
      return reply.status(500).send({
        message: error.message,
      });
    }
  },
};
