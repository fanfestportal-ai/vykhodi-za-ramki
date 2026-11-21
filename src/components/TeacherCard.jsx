import './TeacherCard.css';
export default function TeacherCard({ teacher }) {
  return (
    <article className={`teacher-card ${teacher.placeholder ? 'teacher-card--placeholder' : ''}`}>
      <div className="teacher-card__media">
        <img src={teacher.image} alt={teacher.name} loading="lazy" />
        {teacher.placeholder && <div className="teacher-card__badge">Профиль будет добавлен</div>}
      </div>
      <div className="teacher-card__body">
        <h3 className="teacher-card__name">{teacher.name}</h3>
        <div className="teacher-card__specs">
          {teacher.specializations.map((s) => <span key={s} className="teacher-card__spec">{s}</span>)}
        </div>
        <p className="teacher-card__bio">{teacher.bio}</p>
      </div>
    </article>
  );
}