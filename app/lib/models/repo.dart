class Repo {
  final int id;
  final String name;
  final String owner;
  final bool isPrivate;

  Repo({required this.id, required this.name, required this.owner, required this.isPrivate});

  factory Repo.fromJson(Map<String, dynamic> json) {
    return Repo(
      id: json['id'],
      name: json['name'],
      owner: json['owner'],
      isPrivate: json['isPrivate'],
    );
  }
}