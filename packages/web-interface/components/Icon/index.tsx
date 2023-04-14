export const Icon = ({
  name,
  styles,
}: {
  name: 'branch' | 'download' | 'close' | 'back' | 'api' | 'theme' | 'icons';
  styles?: object;
}) => {
  const size = 30;
  const getIcon = () => {
    switch (name) {
      case 'branch':
        return (
          <>
            <path
              d='M16.3536 13.3536C16.5488 13.1583 16.5488 12.8417 16.3536 12.6464L13.1716 9.46447C12.9763 9.2692 12.6597 9.2692 12.4645 9.46447C12.2692 9.65973 12.2692 9.97631 12.4645 10.1716L15.2929 13L12.4645 15.8284C12.2692 16.0237 12.2692 16.3403 12.4645 16.5355C12.6597 16.7308 12.9763 16.7308 13.1716 16.5355L16.3536 13.3536ZM3 6.5H6.44V5.5H3V6.5ZM7.94 8V11H8.94V8H7.94ZM10.44 13.5H16V12.5H10.44V13.5ZM7.94 11C7.94 12.3807 9.05929 13.5 10.44 13.5V12.5C9.61157 12.5 8.94 11.8284 8.94 11H7.94ZM6.44 6.5C7.26843 6.5 7.94 7.17157 7.94 8H8.94C8.94 6.61929 7.82071 5.5 6.44 5.5V6.5Z'
              fill='currentColor'
            />
            <path d='M11.3334 6H16' stroke='currentColor' />
          </>
        );
      case 'back':
        return (
          <>
            <path
              d='M2.64645 9.64645C2.45118 9.84171 2.45118 10.1583 2.64645 10.3536L5.82843 13.5355C6.02369 13.7308 6.34027 13.7308 6.53553 13.5355C6.7308 13.3403 6.7308 13.0237 6.53553 12.8284L3.70711 10L6.53553 7.17157C6.7308 6.97631 6.7308 6.65973 6.53553 6.46447C6.34027 6.2692 6.02369 6.2692 5.82843 6.46447L2.64645 9.64645ZM17 9.5L3 9.5L3 10.5L17 10.5L17 9.5Z'
              fill='currentColor'
            />
          </>
        );
      case 'download':
        return (
          <>
            <path
              d='M4 13V15C4 16.1046 4.89543 17 6 17H14C15.1046 17 16 16.1046 16 15V13'
              stroke='currentColor'
            />
            <path
              d='M9.64645 13.3536C9.84171 13.5488 10.1583 13.5488 10.3536 13.3536L13.5355 10.1716C13.7308 9.97631 13.7308 9.65973 13.5355 9.46447C13.3403 9.2692 13.0237 9.2692 12.8284 9.46447L10 12.2929L7.17157 9.46447C6.97631 9.2692 6.65973 9.2692 6.46447 9.46447C6.2692 9.65973 6.2692 9.97631 6.46447 10.1716L9.64645 13.3536ZM9.5 3L9.5 13L10.5 13L10.5 3L9.5 3Z'
              fill='currentColor'
            />
          </>
        );
      case 'api':
        return (
          <>
            <path d='M5 6L1 10L5 14' stroke='currentColor' />
            <path d='M15 14L19 10L15 6' stroke='currentColor' />
            <circle cx='7' cy='10' r='1' fill='currentColor' />
            <circle cx='10' cy='10' r='1' fill='currentColor' />
            <circle cx='13' cy='10' r='1' fill='currentColor' />
          </>
        );
      case 'icons':
        return (
          <>
            <path d='M16.5 16.5H3.5V2.5H16.5V16.5Z' stroke='currentColor' />
            <path
              d='M3.5 14L6.5 11.5L9 14L13 8.5L16.5 12.5'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <circle cx='8.5' cy='6.5' r='2' stroke='currentColor' />
          </>
        );
      case 'theme':
        return (
          <>
            <path
              d='M15.5 16.5H4.5V2.5H11.7929L15.5 6.20711V16.5Z'
              stroke='currentColor'
            />
            <path
              d='M8 10L9.33333 12L12 8'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </>
        );
      case 'close':
        return (
          <>
            <path d='M5 15L15 5' stroke='currentColor' />
            <path d='M5 5L15 15' stroke='currentColor' />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={styles}
    >
      {getIcon()}
    </svg>
  );
};
