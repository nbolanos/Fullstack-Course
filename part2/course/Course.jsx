const Part = ({ name, exercises }) => {
    return <p>{name} {exercises}</p>
};

const Content = ({ course }) => {
    const total = course.reduce((acc, obj) => {
            return acc + obj.exercises
        }, 0)

    return(
        <div>  
            {course.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
            <p><strong>total of {total} exercises</strong></p>
        </div>
    )
};

const Header = ({ name }) => {
    return <h1>{name}</h1>
}

const Course = ({ courses }) => {
    return(
        <div>
            {courses.map(course =>
                <div key={course.id}><Header name={course.name} /> <Content course={course.parts} /> </div>
            )}
        </div>
    )
};

export default Course;