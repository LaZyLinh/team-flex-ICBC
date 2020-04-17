import 'package:FlexWork/blocs/book_office_bloc.dart';
import 'package:FlexWork/blocs/lend_office_bloc.dart';
import 'package:FlexWork/blocs/my_bookings_bloc.dart';
import 'package:FlexWork/blocs/user_bloc.dart';
import 'package:FlexWork/pages/coordinator.dart';
import 'package:FlexWork/pages/login_page.dart';
import 'package:FlexWork/widgets/prevent_exit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<UserBloc>(create: (context) => UserBloc()),
        BlocProvider<MyBookingsBloc>(create: (context) => MyBookingsBloc()),
        BlocProvider<LendOfficeBloc>(create: (context) => LendOfficeBloc()),
        BlocProvider<BookOfficeBloc>(create: (context) => BookOfficeBloc()),
      ],
      child: MaterialApp(
        home: BlocBuilder<UserBloc, UserState>(
          builder: (context, userState) {
            if (userState is UserInitial ||
                userState is UserLoggedOut ||
                userState is UserLoginFailure) {
              return PreventExit(Scaffold(body: LoginPage(userState)));
            } else if (userState is UserLoginInProgress) {
              return Container(
                color: Colors.blue,
                child: Center(
                    child: CircularProgressIndicator(
                  backgroundColor: Colors.white,
                )),
              );
            } else if (userState is UserLoginSuccess) {
              return BlocBuilder<MyBookingsBloc, MyBookingsState>(
                builder: (context, myBookingState) =>
                    BlocBuilder<LendOfficeBloc, LendOfficeState>(
                  builder: (context, lendOfficeState) {
                    BlocProvider.of<MyBookingsBloc>(context).add(
                      MyBookingsStarted(userState.user.staffId),
                    );
                    BlocProvider.of<LendOfficeBloc>(context).add(
                      LendOfficeStarted(
                          staffId: userState.user.staffId,
                          hasWorkspace: userState.user.hasWorkspace,
                          workspaceId: userState.user.workspaceId),
                    );
                    return Coordinator(staffId: userState.user.staffId);
                  },
                ),
              );
            } else {
              return Center(
                child: Text("Unexpected State Reached"),
              );
            }
          },
        ),
      ),
    );
  }
}
