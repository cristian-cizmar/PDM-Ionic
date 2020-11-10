import React, { useContext, useEffect, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel
} from '@ionic/react';
import { Redirect } from "react-router-dom";
import { getLogger } from '../core';
import { ItemContext } from './MovieProvider';
import { RouteComponentProps } from 'react-router';
import { MovieProps } from './MovieProps';

const log = getLogger('ItemEdit');

interface ItemEditProps extends RouteComponentProps<{
  id?: string;
}> {}

const ItemEdit: React.FC<ItemEditProps> = ({ history, match }) => {
  const { items, saving, savingError, saveItem } = useContext(ItemContext);
  const [name, setName] = useState('');
  const [length, setLength] = useState(0);	
  const [releaseDate, setReleaseDate] = useState('');	
  const [isWatched, setIsWatched] = useState('');
  const [item, setItem] = useState<MovieProps>();
  useEffect(() => {
    log('useEffect');
    const routeId = match.params.id || '';
    const item = items?.find(it => it._id === routeId);
    setItem(item);
    if (item) {
      setName(item.name);
      setLength(item.length);	
      setReleaseDate(item.releaseDate);	
      setIsWatched(item.isWatched);
    }
  }, [match.params.id, items]);
  const handleSave = () => {
    const editedItem = item ? { ...item, name, length, releaseDate, isWatched } : { name, length, releaseDate, isWatched };
    saveItem && saveItem(editedItem).then(() => history.goBack());
  };
  log('render');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLabel>Name</IonLabel>
        <IonInput value={name} onIonChange={e => setName(e.detail.value || '')} />
        <IonLabel>Length</IonLabel>
        <IonInput value={length} onIonChange={e => setLength(Number(e.detail.value || 0))} />
        <IonLabel>Release Date</IonLabel>
        <IonInput value={releaseDate} onIonChange={e => setReleaseDate(e.detail.value || '')} />
        <IonLabel>IsWatched</IonLabel>
        <IonInput value={isWatched} onIonChange={e => setIsWatched(e.detail.value || '')} />
        <IonLoading isOpen={saving} />
        {savingError && (
          <div>{savingError.message || 'Failed to save item'}</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ItemEdit;
