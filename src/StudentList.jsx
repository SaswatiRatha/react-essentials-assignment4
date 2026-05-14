import React from 'react';
import StudentItem from './StudentItem';

class StudentList extends React.Component{
    render(){
        const {students, handleDeleteStudent, handleToggleStatus, handleGradeChange, handleUpdateGrade} = this.props;
        if(students.length === 0){
            return(
                <div className="no-students">
                    <p>No students added yet. Add your first student below!</p>
                </div>
            )
        }
        return(
            <div className="student-grid">
                {students.map(student => (
                    <StudentItem 
                        key={student.id}
                        student={student}
                        handleDeleteStudent={handleDeleteStudent}
                        handleToggleStatus={handleToggleStatus}
                        handleGradeChange={handleGradeChange}
                        handleUpdateGrade={handleUpdateGrade}
                    />
                ))}
            </div>
            
        )
    }
}

export default StudentList;