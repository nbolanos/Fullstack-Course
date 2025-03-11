const Persons = ({ name, number, id, removePerson }) => {
    return(
        <div key={id}>
            {name} {number}
            <button onClick={removePerson}> delete</button>
        </div>
    )
};

export default Persons;