import { FC, useState, useEffect, MouseEvent } from "react";

import "./Weektime.scss";
import classNames from "classnames";

type AxisType = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const Weektime: FC = () => {
  const hours: number[] = [...Array(24).keys()];
  const timePeriods: number[] = [...Array(48 * 7).keys()].map((i) => i + 1);
  const weekdays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [timeTextList, setTimeTextList] = useState<string[]>([]);
  const [isMove, setIsMove] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [axis, setAxis] = useState<Partial<AxisType>>({});
  const [values, setValues] = useState<number[]>([]);

  const initTimeText = () => {
    const timeTextList: string[] = [];
    [...Array(24).keys()].map((item) => {
      timeTextList.push(...[`${item < 10 ? "0" + item : item}:00`, `${item < 10 ? "0" + item : item}:30`]);
    });
    timeTextList.push("24:00");
    return timeTextList;
  };

  const tipText = (index: number) => {
    const timeIndex = index % 48;
    const weekIndex = Math.floor(index / 48);
    return `${weekdays[weekIndex]} ${timeTextList[timeIndex]}~${timeTextList[timeIndex + 1]}`;
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsMove(true);
    const targetEl = event.target as HTMLElement;
    const startIndex = Number(targetEl.getAttribute("data-index"));
    setActiveIndex([startIndex]);
    setAxis({ ...axis, startX: startIndex % 48, startY: Math.floor(startIndex / 48) });
  };
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isMove) return;
    const targetEl = event.target as HTMLElement;
    const index = Number(targetEl.getAttribute("data-index"));
    const newAxis = {
      ...axis,
      endX: index % 48,
      endY: Math.floor(index / 48),
    };
    const indexList = getSelectIndex(newAxis as AxisType);
    setActiveIndex(indexList);
  };
  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    setIsMove(false);
    const targetEl = event.target as HTMLElement;
    const endIndex = Number(targetEl.getAttribute("data-index"));
    const newAxis = {
      ...axis,
      endX: endIndex % 48,
      endY: Math.floor(endIndex / 48),
    };
    setAxis(newAxis);
    const indexList = getSelectIndex(newAxis as AxisType);
    const isInclude = indexList.every((item) => values.includes(item));
    const newValues = isInclude
      ? values.filter((item) => !indexList.includes(item))
      : [...new Set([...values, ...indexList])];
    const sortValues = newValues.sort((a, b) => {
      return a - b;
    });
    setValues(sortValues);
    setActiveIndex([]);
  };

  const getSelectIndex = (AXIS: AxisType) => {
    const indexList = [];
    const startX = Math.min(AXIS.startX, AXIS.endX);
    const startY = Math.min(AXIS.startY, AXIS.endY);
    const endX = Math.max(AXIS.startX, AXIS.endX);
    const endY = Math.max(AXIS.startY, AXIS.endY);

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        indexList.push(x + y * 48);
      }
    }
    return indexList;
  };

  const handleClear = () => {
    setValues([]);
  };

  useEffect(() => {
    setTimeTextList(initTimeText());
  }, []);

  const groupNumberArray = (arr: number[]) => {
    const result: number[][] = [];
    let item: number;
    let temp: number[];
    arr.forEach((v) => {
      if (item === v) {
        temp.push(item);
        item++;
        return;
      }
      temp = [v];
      item = v + 1;
      result.push(temp);
    });
    return result;
  };

  useEffect(() => {
    const selectTimes = () => {
      const res: string[] = [];
      [...Array(7).keys()].forEach((i) => {
        const week: number[] = [];
        values.forEach((j) => {
          if (j >= i * 48 && j <= i * 48 + 47) {
            week.push(j);
          }
        });
        const groups = groupNumberArray(week);
        const row: string[] = [];
        groups.forEach((group) => {
          if (group.length >= 1) {
            const startTime = timeTextList[group[0] % 48];
            const endTime = timeTextList[(group[group.length - 1] % 48) + 1];
            row.push(`${startTime} ~ ${endTime}`);
          }
        });
        res.push(row.join("、"));
      });
      setSelectedPeriods(res);
    };
    selectTimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div className="weektime m-4">
      <div className="weektime__header">
        <div className="weektime__title">Week/Time</div>
        <div className="weektime__phase">
          <div className="weektime__phase-top">
            <div className="weektime__range">00:00 - 12:00</div>
            <div className="weektime__range">12:00 - 24:00</div>
          </div>
          <div className="weektime__phase-bottom">
            {hours.map((item) => (
              <div key={item} className="weektime__hour">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="weektime__body">
        <div className="weektime__week">
          {weekdays.map((item) => (
            <div key={item} className="weektime__weekday">
              {item}
            </div>
          ))}
        </div>
        <div
          className="weektime__main"
          role={"presentation"}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {timePeriods.map((item, index) => (
            <div
              key={item}
              data-index={index}
              title={tipText(index)}
              className={classNames(
                "weektime__time",
                { "weektime__time--selected": values.includes(index) },
                { "weektime__time--active": activeIndex.includes(index) },
              )}
            ></div>
          ))}
        </div>
      </div>

      <div className="weektime__footer">
        <div className="weektime__tip">
          <span className="weektime__tip-text">Drag the mouse to select the time period</span>
          <button className="weektime__tip-clear" onClick={handleClear}>
            Clear
          </button>
        </div>

        {!!values.length && (
          <div className="weektime__selected">
            {selectedPeriods.map(
              (selectedPeriod, index) =>
                selectedPeriod && (
                  <div key={index} className="weektime__selected-item">
                    <div className="weektime__selected-item__label">{weekdays[index]}:</div>
                    <div className="weektime__selected-item__value">{selectedPeriod}</div>
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Weektime;
