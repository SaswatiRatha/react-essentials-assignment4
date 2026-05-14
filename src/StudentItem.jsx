import React from "react";

class StudentItem extends React.Component {
  render() {
    const { student, handleDeleteStudent, handleToggleStatus, handleGradeChange, handleUpdateGrade } = this.props;

    return (
      <div
        className={`student-card ${student.passed ? "passed" : "failed"}`}
        key={student.id}
      >
        <div className="student-info">
          <h3>{student.name}</h3>
          <p>
            <strong>Subject: </strong>
            {student.subject}
          </p>
          <p>
            <strong>Grade: </strong>
            {student.grade}%
          </p>
        </div>
        <div className="student-status">
          <span
            className={`status ${student.passed ? "student-passed" : "student-failed"}`}
          >
            {student.passed ? "Passed" : "Failed"}
          </span>
        </div>
        <div className="student-actions section-1">
          <input 
            type="number"
            className="update-grade"
            value={student.tempGrade}
            placeholder="Enter new grade"
            min="0"
            max="100"
            onChange={(e)=>handleGradeChange(student.id,e.target.value)} 
          />
          
          <button
            className="update-btn"
            onClick={() => handleUpdateGrade(student.id)}
            title="Update Grade"
            >
            Update Grade
          </button>
          </div>
          <div className="student-actions">
          <button
            onClick={() => handleDeleteStudent(student.id)}
            className="delete-btn"
            title="Delete Student"
          >
            Delete
          </button>
          <button onClick={() => handleToggleStatus(student.id)}
            className="toggle-btn"
            title="Toggle status"
            >Mark {student.passed ? 'Fail' : 'Pass'}</button>    
        </div>
      </div>
    );
  }
}

export default StudentItem;
