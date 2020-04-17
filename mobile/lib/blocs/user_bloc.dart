import 'package:FlexWork/models/user.dart';
import 'package:FlexWork/util/api.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

/// Handles user login, authentication, and information
///
/// April 11, 2020
/// John Zou of Team Flex

/// Events
abstract class UserEvent extends Equatable {
  @override
  List<Object> get props => null;
}

class UserEmailAddressEntered extends UserEvent {
  final String email;
  UserEmailAddressEntered(this.email);

  @override
  List<Object> get props => [email];
}

class UserLoggedOut extends UserEvent {}

/// Statese
abstract class UserState extends Equatable {
  @override
  List<Object> get props => null;
}

class UserInitial extends UserState {}

class UserLoginInProgress extends UserState {}

class UserLoginSuccess extends UserState {
  final User user;

  UserLoginSuccess(this.user);

  @override
  List<Object> get props => [user];
}

class UserLoginFailure extends UserState {}

class UserBloc extends Bloc<UserEvent, UserState> {
  @override
  UserState get initialState => UserInitial();

  @override
  Stream<UserState> mapEventToState(UserEvent event) async* {
    if (event is UserEmailAddressEntered) {
      yield UserLoginInProgress();
      try {
        // Real login
        final User user = await login(event.email);
        yield UserLoginSuccess(user);

        // Fake login for development:
        // await Future.delayed(Duration(seconds: 1));
        // yield UserLoginSuccess(
        //   User(
        //       email: 'john.hua.zou@gmail.com',
        //       staffId: 5010,
        //       hasWorkspace: true,
        //       workspaceId: "1R5-093"),
        // );
      } catch (err) {
        yield UserLoginFailure();
      }
    }
  }
}
