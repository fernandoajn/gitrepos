import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  & svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    display: flex;
    align-items: baseline;
    width: 100%;

    a {
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        margin-left: 10px;
      }
    }
  }

  a {
    color: #f2784b;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  & > p {
    color: #999;
    text-align: center;
  }

  & > div {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;

    strong {
      font-size: 14px;
    }

    button {
      background: none;
      outline: 0;
      border: 0;
      display: flex;
      align-items: center;

      svg,
      span {
        color: #f2784b;
      }

      span {
        display: inline-block;
        font-size: 14px;
        margin: 0 10px;
      }

      &[disabled] {
        cursor: not-allowed;

        svg,
        span {
          color: #eee;
        }
      }
    }
  }

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #f9690e;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 5px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
