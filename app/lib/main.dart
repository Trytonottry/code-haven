import 'package:flutter/material.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(GitApp());
}

class GitApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GitApp',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginScreen(),
    );
  }
}