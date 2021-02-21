import React from 'react';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';
import { connect } from 'react-redux';

import { routeNames } from '../routes/routeNames';
import { getLibrarySettingsIcon } from '../helpers/icons';
import AuthenticatedLock from '../components/AuthenticatedLock';
import { StatusBarSpacer, TouchableScale } from '../components/common';
import NavigationService from '../routes/NavigationService';
import GuestInfo from '../components/GuestInfo';
import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import ExploreMovieDeck from '../components/movie/ExploreMovieDeck';
import ScreenWrapper from '../components/ScreenWrapper';
import { isAuthenticatedUserSelector } from '../redux/auth/selectors';
import { RootState } from '../redux/types';

/* ------------- Props and State ------------- */
type OwnNavigationProps = { isAuthenticatedUser?: boolean };
type NavigationProps = NavigationStackScreenProps<OwnNavigationProps>;
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = NavigationProps & ReduxProps;

const navigateToSettings = () => {
  NavigationService.navigate(routeNames.Settings);
};

/* ------------- Component ------------- */
class Explore extends React.Component<Props> {
  static navigationOptions = ({ navigation }: NavigationProps): NavigationStackOptions => {
    const isAuthenticatedUser = navigation.getParam('isAuthenticatedUser');
    return isAuthenticatedUser ? {
        headerRight: <TouchableScale onPress={navigateToSettings}>{getLibrarySettingsIcon()}</TouchableScale>,
        } : {};
  };

  componentDidMount() {
    const { navigation, isAuthenticatedUser } = this.props;
    navigation.setParams({ isAuthenticatedUser });
  }

  render() {
    return (
      <ScreenWrapper>
        <AuthenticatedLock placeholder={<GuestInfo />}>
          <StatusBarSpacer />
          <ExploreMovieDeck />
        </AuthenticatedLock>
      </ScreenWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticatedUser: isAuthenticatedUserSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withDelayedLoading(Explore));
