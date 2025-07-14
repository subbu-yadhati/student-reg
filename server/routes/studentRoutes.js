import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controller/studentController.js';

const router = express.Router();

router.get('/students', getStudents);
router.post('/students', createStudent);
router.put('/students/:rollNo', updateStudent);
router.delete('/students/:rollNo', deleteStudent);

export default router;