import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number()
                .required()
                .positive()
                .integer(),
            weight: Yup.number()
                .required()
                .positive()
                .integer(),
            height: Yup.number()
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
}

export default new StudentController();
