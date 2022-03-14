import React, { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useScheduledJobExecution } from 'providers';
import { IExecutionLogEvent } from 'providers/scheduledJobExecution/contexts';

const LazyLogImport = () => import('react-lazylog').then((m) => m.LazyLog);
const LazyLog = dynamic(LazyLogImport, { ssr: false });

export interface IScheduledJobExecutionLog {
  id: string;
}

export interface IJobExecutionContext {
  hubEvents: string[];
}

export interface IHubEvent {
  formattedEvent: string;
  message: string;
  level: string;
  timeStamp: string;
}

interface IScheduledJobExecutionLogDisplay {
  hubEvents: IExecutionLogEvent[];
}

const ScheduledJobExecutionLogDisplay: FC<IScheduledJobExecutionLogDisplay> = ({ hubEvents }) => {
  const logText =
    hubEvents.length > 0
      ? hubEvents.map((e) => `${e.timeStamp.format('DD/MM/YYYY HH:mm:ss.SSS')}: ${e.message}`).join('\r')
      : ' ';

  return (
    <div style={{ height: '450px' }}>
      <LazyLog extraLines={0} enableSearch url={null} text={logText} follow={true} />
    </div>
  );
};

const ScheduledJobExecutionLog: FC<IScheduledJobExecutionLog> = ({}) => {
  const { executionLogEvents, getExecutionLogRequest } = useScheduledJobExecution();

  useEffect(() => {
    getExecutionLogRequest();
  }, []);

  return <ScheduledJobExecutionLogDisplay hubEvents={executionLogEvents} />;
};

export default ScheduledJobExecutionLog;
