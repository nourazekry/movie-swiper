import React from 'react';
import { View, InteractionManager } from 'react-native';
import Animated from 'react-native-reanimated';
import MovieDetails from '../../components/movie/MovieDetails';
import { withDelayedLoading } from '../../components/hoc/withDelayedLoading';

import { MovieId } from '../../redux/movies/types';
import { globalStyles } from '../../globalStyles';
import { NavigationStackScreenProps, NavigationStackOptions } from 'react-navigation-stack/lib/typescript/types';
import { RootState } from '../../redux/types';
import { getMovieSelectorById } from '../../redux/movies/selectors';
import { isGuestUserSelector } from '../../redux/auth/selectors';
import {
  fetchDetailedMovieRequest,
  fetchMovieRecommendationsRequest,
  fetchMovieAccountStateRequest,
} from '../../redux/movies/actions';
import { connect } from 'react-redux';
import { withNavigationFocus, NavigationFocusInjectedProps } from 'react-navigation';

/* ------------- Local ------------- */
const { Value } = Animated;

/* ------------- Props and State ------------- */
export interface MovieDetailsScreenNavigationParams {
  movieId: MovieId;
}

type NavigationProps = NavigationStackScreenProps<MovieDetailsScreenNavigationParams>;
type MapStateToProps = ReturnType<typeof makeMapStateToProps>;
type ReduxProps = ReturnType<MapStateToProps> & typeof mapDispatchToProps;
type PropsWithoutRedux = NavigationProps;
type Props = ReduxProps & PropsWithoutRedux;

/* ------------- Class ------------- */
class MovieDetailsScreen extends React.PureComponent<Props> {
  static navigationOptions = ({ navigation }: NavigationProps): NavigationStackOptions => ({
    title: '',
  });

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchMovieData();
    });
  }

  fetchMovieData = () => {
    const {
      movie,
      movieId,
      isGuestUser,
      fetchDetailedMovieRequest,
      fetchMovieRecommendationsRequest,
      fetchMovieAccountStateRequest,
    } = this.props;

    !movie.movieDetailed && fetchDetailedMovieRequest({ movieId });
    !movie.recommendations && fetchMovieRecommendationsRequest({ movieId });
    !isGuestUser && fetchMovieAccountStateRequest({ movieId });
  };

  render() {
    const { movie } = this.props;

    return (
      <View style={globalStyles.screenContainer}>
        <MovieDetails movie={movie} />
      </View>
    );
  }
}

const makeMapStateToProps = (state: RootState, props: PropsWithoutRedux) => {
  const movieId = props.navigation.getParam('movieId');
  const movieSelector = getMovieSelectorById(movieId);

  return (state: RootState) => ({
    movieId,
    movie: movieSelector(state),
    isGuestUser: isGuestUserSelector(state),
  });
};

const mapDispatchToProps = {
  fetchDetailedMovieRequest,
  fetchMovieRecommendationsRequest,
  fetchMovieAccountStateRequest,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(withDelayedLoading(MovieDetailsScreen));