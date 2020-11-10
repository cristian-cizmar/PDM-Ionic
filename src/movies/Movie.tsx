import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { MovieProps } from './MovieProps';

interface MoviePropsExt extends MovieProps {
  onEdit: (_id?: string) => void;
}

const Movie: React.FC<MoviePropsExt> = ({ _id, name, length, releaseDate, isWatched, onEdit }) => {
  return (
    <IonItem onClick={() => onEdit(_id)}>
      <IonLabel>{name}</IonLabel>
      <IonLabel>{length}</IonLabel>
      <IonLabel>{releaseDate}</IonLabel>
      <IonLabel>{isWatched.toString}</IonLabel>
    </IonItem>
  );
};

export default Movie;
