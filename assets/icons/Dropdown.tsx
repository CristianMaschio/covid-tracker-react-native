import React from 'react';
import Svg, { Path } from 'react-native-svg';

type CheckProps = {
  width?: number | string;
  height?: number | string;
  style?: any;
};

const Check: React.FC<CheckProps> = ({ width = 14, height = 13, style = {} }) => {
  return (
    <Svg style={style} width={width} height={height} fill="#024364" viewBox={`0 0 14 13`}>
      <Path
        stroke="#024364"
        d="M7.79918 12.0086L11.8667 6.60113C12.3625 5.94207 11.8923 5 11.0676 5L2.93248 5C2.10778 5 1.63758 5.94207 2.13332 6.60112L6.20087 12.0086C6.60091 12.5405 7.39913 12.5405 7.79918 12.0086Z"
      />
    </Svg>
  );
};

export default Check;
