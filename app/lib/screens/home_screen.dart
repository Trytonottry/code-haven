import 'package:flutter/material.dart';
import 'package:gitapp/widgets/repo_card.dart';
import 'package:gitapp/services/api_service.dart';

class HomeScreen extends StatelessWidget {
  final ApiService apiService = ApiService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Главная')),
      body: FutureBuilder<List<Repo>>(
        future: apiService.getRepos(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Ошибка загрузки данных'));
          } else {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                return RepoCard(repo: snapshot.data![index]);
              },
            );
          }
        },
      ),
    );
  }
}