import React from 'react';
import { StyleSheet } from 'react-native';
import Deck, { RenderCardParams } from '../Deck';
import InfoBlock from '../InfoBlock';
import CircleLoadingIndicator from '../CircleLoadingIndicator';
import MovieCard from './MovieCard';
import { movieIdsKeyExtractor } from '../../utils/movies';
import { MovieId } from '../../redux/movies/types';
import MovieCardSwipeLabels from './MovieCardSwipeLabels';

/* ------------- Props and State ------------- */
type Props = {
  movieIds: MovieId[];
  onSwipedTop: (id: MovieId) => void;
  onSwipedLeft: (id: MovieId) => void;
  onSwipedRight: (id: MovieId) => void;
};

/* ------------- Class ------------- */
class MovieDeck extends React.PureComponent<Props> {
  renderCircleLoadingIndicator = () => <CircleLoadingIndicator />;

  renderNoMoreCards = () => (
    <InfoBlock renderIcon={this.renderCircleLoadingIndicator} text="Loading Movies" subtext="Please wait" />
  );

  renderMovieCard = (movieId: MovieId, { isTopCard, swipeThresholds }: RenderCardParams) => (
    <>
      <MovieCard movieId={movieId} disabled={!isTopCard} />
      {isTopCard && swipeThresholds && <MovieCardSwipeLabels swipeThresholds={swipeThresholds} />}
    </>
  );

  render() {
    const { movieIds, onSwipedLeft, onSwipedRight, onSwipedTop } = this.props;

    return (
      <Deck
        data={movieIds}
        keyExtractor={movieIdsKeyExtractor}
        style={styles.deck}
        renderCard={this.renderMovieCard}
        renderNoMoreCards={this.renderNoMoreCards}
        onSwipedLeft={onSwipedLeft}
        onSwipedRight={onSwipedRight}
        onSwipedTop={onSwipedTop}
      />
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    margin: 14,
  },
});

export default MovieDeck;