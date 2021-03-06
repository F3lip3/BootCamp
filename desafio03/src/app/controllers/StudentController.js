import * as yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      age: yup
        .number()
        .required()
        .positive()
        .integer(),
      weight: yup
        .number()
        .required()
        .positive()
        .integer(),
      height: yup
        .number()
        .required()
        .positive()
        .integer()
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email }
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height
    });
  }

  async udpate(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      age: yup
        .number()
        .positive()
        .integer(),
      weight: yup
        .number()
        .positive()
        .integer(),
      height: yup
        .number()
        .positive()
        .integer()
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found!' });
    }

    if (req.body.email) {
      const studentExists = await Student.findOne({
        where: { email: req.body.email }
      });
      if (studentExists && studentExists.id !== +id) {
        return res.status(400).json({ error: 'Email unavailable' });
      }
    }

    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height
    });
  }
}

export default new StudentController();
