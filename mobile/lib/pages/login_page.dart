import 'package:FlexWork/blocs/user_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class _LoginForm extends StatefulWidget {
  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<_LoginForm> {
  final _email = TextEditingController();
  final _key = GlobalKey<FormState>();

  String validateEmail(String value) {
    if (value.isEmpty) {
      return 'Enter your ICBC work email address';
    }
    Pattern pattern =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    RegExp regex = new RegExp(pattern);
    if (!regex.hasMatch(value))
      return 'Enter Valid Email';
    else
      return null;
  }

  @override
  Widget build(BuildContext context) {
    onLoginButtonPressed() {
      if (_key.currentState.validate()) {
        BlocProvider.of<UserBloc>(context)
            .add(UserEmailAddressEntered(_email.text));
      }
    }

    return Form(
      key: _key,
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: <Widget>[
            TextFormField(
              decoration: InputDecoration(labelText: 'ICBC Work Email'),
              controller: _email,
              keyboardType: TextInputType.emailAddress,
              validator: validateEmail,
              onFieldSubmitted: (_) => onLoginButtonPressed(),
            ),
          ],
        ),
      ),
    );
  }
}

class LoginPage extends StatelessWidget {
  final UserState state;

  LoginPage(this.state);

  mainMessage() {
    if (state is UserInitial) {
      return Text(
        'Welcome to Flex Work',
        style: TextStyle(
          fontSize: 24,
          color: Colors.blue,
        ),
      );
    }
    if (state is UserLoggedOut) {
      return Text(
        'See you again soon',
        style: TextStyle(
          fontSize: 24,
          color: Colors.grey,
        ),
      );
    }
    if (state is UserLoginFailure) {
      return Text(
        'Hmm, that didn\'t seem to work.\nPlease try again.',
        style: TextStyle(
          fontSize: 20,
          color: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: mainMessage(),
          ),
          _LoginForm(),
        ],
      ),
    );
  }
}
