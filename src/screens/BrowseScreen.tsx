import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';

import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import BrowseSections from '../components/movie/BrowseSections';
import MovieSearchWrapper from '../components/movie/MovieSearchWrapper';
import ScreenWrapper from '../components/ScreenWrapper';
import { routeNames } from '../routes/routeNames';
import { getLibrarySettingsIcon } from '../helpers/icons';
import {TouchableScale } from '../components/common';
import NavigationService from '../routes/NavigationService';

/* ------------- Props and State ------------- */
type Props = NavigationStackScreenProps<{}>;

const navigateToSettings = () => {
  NavigationService.navigate(routeNames.Settings);
};

/* ------------- Component ------------- */
class Browse extends React.Component<Props> {
   static navigationOptions = {
    headerRight: <TouchableScale onPress={navigateToSettings}>{getLibrarySettingsIcon()}</TouchableScale>,
   };
  render() {
    return (
      <ScreenWrapper>
        <MovieSearchWrapper>
          <BrowseSections />
        </MovieSearchWrapper>
      </ScreenWrapper>
    );
  }
}

export default withDelayedLoading(Browse);
