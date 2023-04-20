import styled from 'styled-components';

const animationTimeline = 1000;
const sparkDelay = 200;

const LoaderWrapper = styled.div`
  animation-name: loader;
  animation-duration: 0ms;
  animation-fill-mode: forwards;
  transform: scale(0);
  opacity: 0;

  @keyframes loader {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Hammer = styled.g`
  transform: rotate(0deg);
  transform-origin: 100% 0%;
  animation-name: hammer;
  animation-duration: ${animationTimeline}ms;
  animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  animation-iteration-count: infinite;

  @keyframes hammer {
    0% {
      transform: rotate(90deg);
    }

    20% {
      transform: rotate(8deg);
    }

    30% {
      transform: rotate(4deg);
    }

    40% {
      transform: rotate(4deg);
    }

    98% {
      transform: rotate(90deg);
    }

    100% {
      transform: rotate(90deg);
    }
  }
`;

const Sparks = styled.g`
  #bigSpark,
  #lilSpark {
    transform: scale(0);
    opacity: 0;
    transform-origin: 40% 60%;
    animation-name: spark;
    animation-duration: ${animationTimeline}ms;
    animation-delay: ${sparkDelay}ms;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  #lilSpark {
    transform-origin: 60% 60%;
    animation-delay: ${sparkDelay + 100}ms;
  }

  @keyframes spark {
    0% {
      transform: scale(0);
      opacity: 0;
    }

    20% {
      opacity: 1;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
`;

export const Loader = () => {
  return (
    <LoaderWrapper>
      <svg
        width='154'
        height='116'
        viewBox='0 0 154 116'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        overflow='visible'
      >
        <Sparks>
          <path
            id='bigSpark'
            d='M15.9384 45.0019L34.9677 59.8691V42.462L46.3204 65.3238H55.2927L26.6007 7.31175V42.6206L0 21.8453L13.4565 65.3238H22.225L15.9384 45.0019Z'
            fill='#00B6B4'
          />
          <path
            id='lilSpark'
            d='M106.563 59.4664L110.987 63.7062L118.612 57.8124L116.781 65.3235H122.506L127.808 43.5693L111.369 56.2755L104.685 49.8729L97.8953 65.3238H103.988L106.563 59.4664Z'
            fill='#00B6B4'
          />
        </Sparks>
        <Hammer>
          <path
            d='M79.0297 31.1237L83.9713 40.8717L151.326 10.0385C152.078 9.69412 152.65 9.06977 152.917 8.30503C153.185 7.53944 153.126 6.6957 152.753 5.957L150.632 1.76433C150.257 1.03015 149.602 0.462408 148.809 0.185065C148.016 -0.0922706 147.15 -0.0567261 146.4 0.283803L79.0297 31.1237Z'
            fill='#6E46AE'
          />
          <path
            d='M69.3878 27.2659C68.0059 28.3897 66.4926 29.3435 64.8827 30.1067C63.3191 30.865 61.6719 31.4385 59.9758 31.8152C60.0872 34.0896 59.7663 36.3645 59.0312 38.5194L66.0671 53.1423C67.1839 53.0408 68.3031 53.3106 69.2502 53.9109C70.198 54.5114 70.9198 55.4079 71.3049 56.4615L81.4224 51.588C80.4988 50.1664 80.1142 48.4606 80.3361 46.7799C80.6835 44.8328 82.0611 43.2039 84.4378 41.8916L78.5297 29.4945C76.3486 30.1856 72.2917 29.4666 69.3878 27.2659Z'
            fill='#3D2462'
          />
          <path
            d='M71.8493 65.0531L87.859 57.3174L84.8259 51.0528L68.8007 58.7725L71.8493 65.0531Z'
            fill='#6E46AE'
          />
          <path
            d='M70.9691 22.2915C69.991 20.0978 68.1667 18.3942 65.9116 17.5671C63.6573 16.7402 61.1632 16.861 58.9992 17.9029C56.8354 18.9441 55.1846 20.817 54.4237 23.095C53.6629 25.3732 53.8561 27.8624 54.9601 29.995C55.9147 31.9768 60.5465 31.055 64.4298 29.1928C68.3123 27.3305 71.9275 24.2649 70.9691 22.2915Z'
            fill='#6E46AE'
          />
        </Hammer>
        <path
          id='anvil'
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M35.3428 101.832C38.9452 101.921 42.1508 101.996 42.6677 101.996H43.4072C48.6277 102.745 51.2057 105.763 51.2057 110.293C51.2057 112.293 50.3672 114.124 48.9854 115.549H111.735C106.549 112.483 103.127 107.325 103.127 101.471C103.127 92.0764 111.911 84.437 122.718 84.437C124.477 84.437 125.908 83.1641 125.908 81.5805L125.907 73.1817C125.908 72.2793 125.091 71.5491 124.085 71.5491L124.086 71.5499H25.9701L35.3428 101.832ZM23.8765 71.5499H14.9071C14.9071 72.1444 18.6167 83.9066 21.3561 92.5926C22.7328 96.9577 23.8645 100.546 24.1571 101.549C24.1571 101.549 28.6602 101.666 33.233 101.78L23.8765 71.5499Z'
          fill='#6E46AE'
        />
      </svg>
    </LoaderWrapper>
  );
};
