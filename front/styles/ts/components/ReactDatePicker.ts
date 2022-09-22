import styled from 'styled-components';

export const DatePickerWrapper = styled.div`
  float: left;
  position: relative;
  margin-left: 20px;
  padding: 2px 0 0 2px;
  width: 600px;

  & .react-datepicker-wrapper {
    float: left;
    width: 104px;
    height: 30px;
    margin: 0 0 0 7px;

    .date_input {
      width: 100px;
      height: 30px;
      cursor: pointer;

      &.on {
        border-color: #909090 !important;
      }
    }
  }

  .react-datepicker__header {
    background-color: #fff;
    border-bottom: none;
    padding: 0;
    margin-bottom: 4px;
    font-family: Avenir Next, Noto Sans DemiLight;

    .react-datepicker__current-month {
      padding-bottom: 10px;
      font-size: 18px;
      font-weight: 400;
    }

    .react-datepicker__day-names {
      .react-datepicker__day-name {
        margin-right: 5px;
        color: rgba(0, 0, 0, 0.37);
      }
    }
  }

  .react-datepicker__navigation {
    top: 24px;
  }

  .react-datepicker__navigation--previous {
    left: 33px;
  }

  .react-datepicker__navigation--next {
    right: 33px;
  }

  .react-datepicker__month {
    font-size: 15px;
    line-height: 20px;

    .react-datepicker__week {
      .react-datepicker__day {
        margin-right: 5px;
      }
    }
  }

  .react-datepicker {
    height: 308px;
    padding: 21px 30px 15px;
    font-size: 14px;
    font-family: Avenir Next, Noto Sans DemiLight;
  }

  input {
    font-family: Avenir Next, Noto Sans DemiLight, AppleSDGothicNeo-Regular, Malgun Gothic, dotum, sans-serif;
    color: #000;
    text-align: center;
    border: 1px solid #e9e9e9;
    box-sizing: border-box;
    display: block;
    outline: none;
  }

  input[type='number']:focus {
    border-color: #909090 !important;
  }

  & .sign {
    float: left;
    padding: 4px 4px 0;
  }
`;

export const DateBox = styled.div`
  float: left;
  height: 30px;
  margin: 0 0 0 7px;

  & input {
    width: 31px;
    height: 30px;
  }

  &:last-child {
    margin: 0;
  }
`;
