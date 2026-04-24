interface Props {
    grade: "9" | "10" | "11"; // restrict it
    subject: SubjectKey;
}

const MainP = ({ grade, subject }: Props) => {
    const gradeKey = `grade${grade}` as GradeKey;

    const data = curriculum[gradeKey]?.[subject];

    if (!data) return <div>No data</div>;

    return (
        <div>
            {data.map((unit, i) => (
                <div key={i}>{unit.topic}</div>
            ))}
        </div>
    );
};