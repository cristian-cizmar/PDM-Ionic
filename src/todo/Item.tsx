import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { ItemProps } from './ItemProps';

interface ItemPropsExt extends ItemProps {
  onEdit: (_id?: string) => void;
}

const Item: React.FC<ItemPropsExt> = ({ _id, name, length, releaseDate, isWatched, onEdit }) => {
  return (
    <IonItem onClick={() => onEdit(_id)}>
      <IonLabel>{name}</IonLabel>
      <IonLabel>{length}</IonLabel>
      <IonLabel>{releaseDate}</IonLabel>
      <IonLabel>{isWatched.toString}</IonLabel>
    </IonItem>
  );
};

export default Item;
