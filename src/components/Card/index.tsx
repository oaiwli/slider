import styles from "./styles.module.scss";
import { IEvent } from "../data/events";

interface IEventCardProps {
  event: IEvent;
}

export const EventCard = ({ event }: IEventCardProps) => {
  return (
    <div className={styles.card}>
      <h3>{event.year}</h3>
      {event.date && <p className={styles.date}>{event.date}</p>}
      <p>{event.description}</p>
    </div>
  );
};
