import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:gitapp/models/repo.dart';

class ApiService {
  final String _baseUrl = 'http://localhost:4000/api';

  Future<List<Repo>> getRepos() async {
    final response = await http.get(Uri.parse('$_baseUrl/repos'));
    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((repo) => Repo.fromJson(repo)).toList();
    } else {
      throw Exception('Failed to load repos');
    }
  }
}