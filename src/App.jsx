import React from "react";
import "./App.css";
import StudentList from "./StudentList";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      students: [],
      newStudent: {
        name: '',
        subject: '',
        grade: '',
        tempGrade: '',
      },
      filter: 'all',
      sortBy: 'default',
    }
  }

  componentDidMount(){
    console.log('componentDidMount: component has mounted to DOM');
    const studentData = [
        {
          id: 1,
          name: 'Daniel Serrano',
          subject: 'Mathematics',
          grade: 87,
          passed: true,
          tempGrade: '',
        },
        {
          id: 2,
          name: 'Oscar Robla',
          subject: 'Science',
          grade: 75,
          passed: true,
          tempGrade: '',
        },
        {
          id: 3,
          name: 'Miriam Esteban',
          subject: 'English',
          grade: 60,
          passed: false,
          tempGrade: '',
        },
      ];

      this.setState({
        students: studentData
      });
  }

  componentDidUpdate(prevProps, prevState){
    console.log('componentDidUpdate: component has updated');
    console.log('Previous state: ', prevState);
    console.log('Current state: ',this.state.students);

    if (prevState.students.length === 0) {
      return;
    }

    if(prevState.students.length < this.state.students.length){
      console.log("New student added!");
    }
  }

  componentWillUnmount(){
    console.log("componentWillUnmount: Component is going to be removed");
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;

    this.setState({
      newStudent: {
        ...this.state.newStudent,
        [name]:value
      }
    });
  };

  handleAddSubmit = (event) => {
    event.preventDefault();

    const {name,subject,grade} = this.state.newStudent;
    if(!name.trim() || !subject || !grade){
      alert("Please fill in all fields!");
      return;
    }

    const gradeNumber = parseInt(grade,10);

    if(isNaN(gradeNumber) || gradeNumber<0 || gradeNumber>100){
      alert("Please provide grade between 0 to 100!");
      return; 
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      subject: subject,
      grade: gradeNumber,
      passed: gradeNumber >=60,
      tempGrade: '',
    }

    this.setState({
      students: [...this.state.students, newStudent],
      newStudent: {
        name: '',
        subject: '',
        grade: '',
        tempGrade: '',
      },
      
    })
  }

  handleDeleteStudent= (studentID) => {
    if(window.confirm('Are you sure you want to delete this student?')){
      this.setState({
        students: this.state.students.filter(student => student.id!==studentID)});
    }
  };

  handleToggleStatus = (studentID) => {
    this.setState({
      students: this.state.students.map(student => {
        if(student.id === studentID){
          return {
            ...student,
            passed: !student.passed,
          }
        }
        return student;
      })
    })
  }

  handleGradeChange = (studentID, newGrade) => {
    this.setState({
      students: this.state.students.map(student => {
        if(student.id === studentID){
          return {
            ...student,
            tempGrade: newGrade,
          }
        }
        return student;
      })
    });
  }

  handleUpdateGrade = (studentID) => {

    const studentToBeUpdated = this.state.students.find(student => student.id === studentID);
    const newGradeNumber = parseInt(studentToBeUpdated.tempGrade, 10);
    console.log("Updating grade for student ID: ", studentID, "New Grade: ", studentToBeUpdated.tempGrade);
    if(isNaN(newGradeNumber) || newGradeNumber<0 || newGradeNumber>100){
      alert("Please provide grade between 0 to 100!");
      return; 
    }

    this.setState({
      
      students: this.state.students.map(student => {
        if(student.id === studentID){
          return {
            ...student,
            grade: newGradeNumber,
            passed: newGradeNumber >=60,
            tempGrade: '',
          }
        }
        return student;
      }),
    })
  }

  handleFilter = (filter) => {
    this.setState({
      filter: filter,
    })
    
  }

  handleSortBy = (sortBy) => {
    this.setState({
      sortBy: sortBy,
    })
    
  }

  handleFilteredStudents = () => {
    if(this.state.filter === 'passed'){
      return this.state.students.filter(student => student.passed);
    } else if(this.state.filter === 'failed'){
      return this.state.students.filter(student => !student.passed);
    }
    return this.state.students;
  }

  handleSortedStudents = () => {
    const filteredStudents = [...this.handleFilteredStudents()];

    if(this.state.sortBy === 'high'){
      return filteredStudents.sort((a,b)=> b.grade - a.grade);
    } else if(this.state.sortBy === 'low'){
      return filteredStudents.sort((a,b)=> a.grade - b.grade);
    }
    return filteredStudents;
  }

  render(){
    return(
      <div className="app">
        <header className="app-header">
          <h1>Student Grade Tracker</h1>
        </header>

        <main className="main">
          <section className="add-student-section">
            <h2>Add New Student</h2>

            <form onSubmit={this.handleAddSubmit} className="add-student-form">
              <div className="form-group">
                <label htmlFor="studentName">Student Name:</label>
                <input 
                  type="text"
                  id="studentName"
                  name="name"
                  value={this.state.newStudent.name}
                  onChange={this.handleInputChange}
                  placeholder="Enter full name"
                  required
                 />
              </div>
              <div className="form-group">
                <label htmlFor="studentSubject">Subject:</label>
                <select 
                  name="subject" 
                  id="studentSubject"
                  value={this.state.newStudent.subject}
                  onChange={this.handleInputChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>

                </select>
              </div>
              <div className="form-group">
                <label htmlFor="studentGrade">Grade (0-100):</label>
                <input 
                  type="number"
                  id="studentGrade"
                  name="grade"
                  value={this.state.newStudent.grade}
                  onChange={this.handleInputChange}
                  placeholder="Enter student's grade"
                  min="0"
                  max="100"
                />
              </div>
              <div className="button-group">
              <button type="submit" className="submit-btn">Add Student</button>
              </div>
            </form>
          </section>
          <section className="filter-students">
            <h3>Filter By:</h3>
            <div className="filter-buttons">
              <button className={this.state.filter === 'all' ? 'active' : ''} onClick={() => this.handleFilter('all')}>All</button>
              <button className={this.state.filter === 'passed' ? 'active' : ''} onClick={() => this.handleFilter('passed')}>Passed</button>
              <button className={this.state.filter === 'failed' ? 'active' : ''} onClick={() => this.handleFilter('failed')}>Failed</button>
            </div>
            <h3>Sort By Grade:</h3>
            <div className="filter-buttons">
              <button className={this.state.sortBy === 'high' ? 'active' : ''} onClick={()=>this.handleSortBy('high')}>High to Low</button>
              <button className={this.state.sortBy === 'low' ? 'active' : ''} onClick={()=>this.handleSortBy('low')}>Low to High</button>
              <button className={this.state.sortBy === 'default' ? 'active' : ''} onClick={()=>this.handleSortBy('default')}>Set Default</button>
            </div>
          </section>

          <section className="student-section">
            <h2>Student List ({this.state.students.length})</h2>
            <StudentList 
              students={this.handleSortedStudents()}
              handleDeleteStudent={this.handleDeleteStudent}
              handleToggleStatus={this.handleToggleStatus}
              handleGradeChange={this.handleGradeChange}
              handleUpdateGrade={this.handleUpdateGrade}
            />
          </section>
        </main>
      </div>
    )
  }
}

export default App;