import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { ItemProps } from './ItemProps';

interface ItemPropsExt extends ItemProps {
  onEdit: (id?: string) => void;
}

const Item: React.FC<ItemPropsExt> = ({ id, name, length, releaseDate, onEdit }) => {
  return (
    <IonItem onClick={() => onEdit(id)}>
      <IonLabel>{name}</IonLabel>
      <IonLabel>{length}</IonLabel>
      <IonLabel>{releaseDate}</IonLabel>
    </IonItem>
  );
};

export default Item;
