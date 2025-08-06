import 'package:flutter/material.dart';
import 'package:gitapp/models/repo.dart';

class RepoCard extends StatelessWidget {
  final Repo repo;

  RepoCard({required this.repo});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(repo.name),
        subtitle: Text('Владелец: ${repo.owner}'),
        trailing: Icon(repo.isPrivate ? Icons.lock : Icons.public),
      ),
    );
  }
}