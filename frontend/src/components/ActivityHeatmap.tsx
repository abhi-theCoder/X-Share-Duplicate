import React from 'react';
import { Tooltip } from 'react-tooltip';
import { format, subYears, eachDayOfInterval, getWeek, getMonth, isSameDay, startOfWeek } from 'date-fns';

// Helper function to generate a year's worth of dummy activity data
const generateDummyActivityData = () => {
  const dummyData = [];
  const today = new Date();
  const oneYearAgo = subYears(today, 1);

  let currentDate = oneYearAgo;
  while (currentDate <= today) {
    // Generate a random number of contributions for the day
    const count = Math.floor(Math.random() * 20);
    dummyData.push({
      date: currentDate.toISOString(),
      count: count
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dummyData;
};

// Helper function to determine the color of each square based on the contribution count
const getSquareColor = (count) => {
  if (count === 0) return 'bg-gray-200';
  if (count < 5) return 'bg-green-100';
  if (count < 10) return 'bg-green-300';
  if (count < 15) return 'bg-green-500';
  return 'bg-green-700';
};

// Main component for the activity heatmap
const ActivityHeatmap = ({ activityData }) => {
  // Use dummy data if no activityData is provided
  const data = activityData.length > 0 ? activityData : generateDummyActivityData();

  const today = new Date();
  const oneYearAgo = subYears(today, 1);

  // Normalize and aggregate the activity data by date
  const normalizedData = data.reduce((acc, item) => {
    const date = format(new Date(item.date), 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + item.count;
    return acc;
  }, {});

  // Generate an array of all days in the last year
  const allDays = eachDayOfInterval({
    start: startOfWeek(oneYearAgo, { weekStartsOn: 0 }),
    end: today,
  });

  // Organize days into weeks for the grid layout
  const weeks = [];
  let currentWeek = [];
  let lastWeekNumber = getWeek(allDays[0], { weekStartsOn: 0 });

  allDays.forEach(day => {
    const weekNumber = getWeek(day, { weekStartsOn: 0 });
    if (weekNumber !== lastWeekNumber) {
      weeks.push([...currentWeek]);
      currentWeek = [];
      lastWeekNumber = weekNumber;
    }
    currentWeek.push(day);
  });
  weeks.push(currentWeek); // Push the final week

  // Create month labels for the top of the heatmap
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const firstDayInWeek = week[0];
    if (firstDayInWeek && getMonth(firstDayInWeek) !== lastMonth) {
      monthLabels.push({
        name: format(firstDayInWeek, 'MMM'),
        index: weekIndex,
      });
      lastMonth = getMonth(firstDayInWeek);
    }
  });

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100 font-sans">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Activity Heatmap</h3>
      <div className="flex flex-col">
        {/* Month labels and heatmap container */}
        <div className="flex pl-8 ml-2 text-xs text-gray-500 mb-2 whitespace-nowrap">
          {monthLabels.map((month, index) => {
            const prevMonth = index > 0 ? monthLabels[index - 1] : { index: -1 };
            const weeksToSkip = month.index - (prevMonth.index + 1);
            return (
              <React.Fragment key={month.name + month.index}>
                {/* Render a spacer for each week that needs to be skipped */}
                {Array.from({ length: weeksToSkip }).map((_, i) => (
                  <span key={`spacer-${index}-${i}`} className="w-4"></span> // A small, fixed width to match the column
                ))}
                <span className="font-semibold text-gray-600 w-fit">
                  {month.name}
                </span>
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex overflow-x-auto scrollbar-hide mt-1">
          {/* Day labels on the left */}
          <div className="flex flex-col text-xs text-gray-500 mr-2 whitespace-nowrap mt-2">
            <span className="h-4"></span>
            <span className="my-0.5">Mon</span>
            <span className="my-0.5"></span>
            <span className="my-0.5">Wed</span>
            <span className="my-0.5"></span>
            <span className="my-0.5">Fri</span>
            <span className="my-0.5"></span>
          </div>

          {/* Heatmap Grid */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((day, dayIndex) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const count = normalizedData[dateStr] || 0;
                  const isToday = isSameDay(day, today);

                  // Only render the square if it's within the last year
                  if (day > today) return null;

                  return (
                    <div
                      key={dateStr}
                      className={`w-3 h-3 rounded-sm ${getSquareColor(count)} ${isToday ? 'border border-gray-900' : ''}`}
                      data-tooltip-id="heatmap-tooltip"
                      data-tooltip-content={`${count} contribution${count !== 1 ? 's' : ''} on ${format(day, 'MMM d, yyyy')}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-sm bg-gray-200"></div>
          <div className="w-3 h-3 rounded-sm bg-green-100"></div>
          <div className="w-3 h-3 rounded-sm bg-green-300"></div>
          <div className="w-3 h-3 rounded-sm bg-green-500"></div>
          <div className="w-3 h-3 rounded-sm bg-green-700"></div>
        </div>
        <span>More</span>
      </div>
      <Tooltip id="heatmap-tooltip" className="bg-gray-800 text-white text-sm rounded-md px-2 py-1" />
    </div>
  );
};

export default ActivityHeatmap;
