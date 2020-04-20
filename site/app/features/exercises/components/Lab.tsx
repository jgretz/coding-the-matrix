import React from 'react';
import {compose} from '@truefit/bach';
import {withStyles} from '@truefit/bach-material-ui';
import {CSSProperties} from '@material-ui/styles';

type Classes = {
  answerContainer: string;
  question: string;
  graph: string;
};

type PublicProps = {
  output: {[key: string]: string | Function | React.ReactNode};
};

type InternalProps = {
  classes: Classes;
};

type Props = PublicProps & InternalProps;

type QuestionProps = {
  classes: Classes;
  value: string | React.ReactNode;
};

const Question = ({classes, value}: QuestionProps) => {
  if (typeof value === 'string') {
    return <div>{value}</div>;
  }

  if (typeof value === 'function') {
    return <div className={classes.graph}>{value()}</div>;
  }

  return <div className={classes.graph}>{value}</div>;
};

const Lab = ({classes, output}: Props) => (
  <div>
    {Object.keys(output).map((key) => (
      <div key={key} className={classes.answerContainer}>
        <div className={classes.question}>{key}: </div>
        <Question classes={classes} value={output[key]} />
      </div>
    ))}
  </div>
);

const styles = {
  answerContainer: {
    display: 'flex',
  },
  question: {
    fontWeight: 'bold',
    width: 50,
  } as CSSProperties,
  graph: {
    width: 320,
    height: 200,
  },
};

export default compose<PublicProps>(withStyles(styles))(Lab);
