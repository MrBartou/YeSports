import { eachDayOfInterval, startOfMonth, endOfMonth, format } from 'date-fns';
import PropTypes from 'prop-types';

const CustomCalendar = ({ currentDate, matches, onSelectDay }) => {
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {daysInMonth.map(day => {
        const dayKey = format(day, 'yyyy-MM-dd');
        const hasMatch = matches[dayKey]?.length > 0;
        return (
          <div key={dayKey} className={`p-2 bg-gray-100 ${hasMatch ? 'bg-red-100' : ''}`} onClick={() => hasMatch && onSelectDay(dayKey)}>
            <span>{format(day, 'd')}</span>
            {hasMatch && <span className="h-2 w-2 bg-red-500 rounded-full inline-block ml-1"></span>}
          </div>
        );
      })}
    </div>
  );
};

CustomCalendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  matches: PropTypes.object.isRequired,
  onSelectDay: PropTypes.func.isRequired,
};

export default CustomCalendar;
