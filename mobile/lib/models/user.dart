import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String email;
  final int staffId;
  final bool hasWorkspace;
  final String workspaceId;

  User(
      {this.email,
      this.staffId,
      this.hasWorkspace = false,
      this.workspaceId = ""});

  @override
  List<Object> get props => [email];
}
