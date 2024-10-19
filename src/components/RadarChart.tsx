import React from 'react';

interface RadarChartProps {
  data: {
    aiKnowledge: number;
    contentCreation: number;
    adaptability: number;
    timeManagement: number;
    entrepreneurialSpirit: number;
  };
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const maxValue = 100;
  const angles = [0, 72, 144, 216, 288];
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;

  const getCoordinates = (angle: number, value: number) => {
    const x = center + radius * Math.cos(angle * Math.PI / 180) * (value / maxValue);
    const y = center + radius * Math.sin(angle * Math.PI / 180) * (value / maxValue);
    return { x, y };
  };

  const dimensions = [
    { key: 'aiKnowledge', label: 'AI知识' },
    { key: 'contentCreation', label: '内容创作' },
    { key: 'adaptability', label: '适应能力' },
    { key: 'timeManagement', label: '时间管理' },
    { key: 'entrepreneurialSpirit', label: '创业精神' },
  ];

  const points = dimensions.map((dim, i) => getCoordinates(angles[i], data[dim.key as keyof typeof data]));
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + 'Z';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circles */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={radius * scale}
          fill="none"
          stroke="#ddd"
          strokeWidth="1"
        />
      ))}

      {/* Dimension lines */}
      {angles.map((angle, i) => {
        const end = getCoordinates(angle, maxValue);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={end.x}
            y2={end.y}
            stroke="#ddd"
            strokeWidth="1"
          />
        );
      })}

      {/* Data path */}
      <path
        d={pathData}
        fill="rgba(59, 130, 246, 0.5)"
        stroke="#3b82f6"
        strokeWidth="2"
        className="animate-draw-path"
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#3b82f6"
        />
      ))}

      {/* Labels */}
      {dimensions.map((dim, i) => {
        const labelPos = getCoordinates(angles[i], maxValue * 1.1);
        return (
          <text
            key={i}
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="#4b5563"
          >
            {dim.label}
          </text>
        );
      })}
    </svg>
  );
};

export default RadarChart;