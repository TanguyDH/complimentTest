import React from 'react'
import styles from "./CollectionHeader.module.scss";



const CollectionHeader: React.FC = props => {
  return (
    <div className={styles.collectionHeader}>
      <div>
        <h1>Des produits sains faits pour vous</h1>
        <p>
          Vitamines & compléments alimentaires garantis sans OGM, sans gluten et
          sans nanoparticules, formulés avec une haute biodisponibilité et des
          capsules végétales.
        </p>
      </div>
    </div>
  );
};

export default CollectionHeader;
