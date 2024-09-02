import React from 'react';

interface MustContainItemProps {
  data?: [string, boolean];
}

const MustContainItem: React.FC<MustContainItemProps> = (props) => {
  const { data } = props;
  const label = data?.[0];
  const meetsReq = data?.[1];

  const setClass = () => {
    const classArr = ['must-line'];
    if (meetsReq) classArr.push('cross-out');
    return classArr.join(' ');
  };

  return (
    <div className="must-item">
      <div className={setClass()}>
        <ul className="must-text"> 
          <li>
            <h6>{label}</h6>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MustContainItem;
