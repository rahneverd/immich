//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SyncAcknowledgeDto {
  /// Returns a new [SyncAcknowledgeDto] instance.
  SyncAcknowledgeDto({
    this.activities,
    this.albumAsset,
    this.albums,
    this.assets,
    this.memories,
    this.partners,
    this.people,
    this.sharedLinks,
    this.stacks,
    this.users,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? activities;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? albumAsset;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? albums;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? assets;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? memories;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? partners;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? people;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? sharedLinks;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? stacks;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? users;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SyncAcknowledgeDto &&
    other.activities == activities &&
    other.albumAsset == albumAsset &&
    other.albums == albums &&
    other.assets == assets &&
    other.memories == memories &&
    other.partners == partners &&
    other.people == people &&
    other.sharedLinks == sharedLinks &&
    other.stacks == stacks &&
    other.users == users;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (activities == null ? 0 : activities!.hashCode) +
    (albumAsset == null ? 0 : albumAsset!.hashCode) +
    (albums == null ? 0 : albums!.hashCode) +
    (assets == null ? 0 : assets!.hashCode) +
    (memories == null ? 0 : memories!.hashCode) +
    (partners == null ? 0 : partners!.hashCode) +
    (people == null ? 0 : people!.hashCode) +
    (sharedLinks == null ? 0 : sharedLinks!.hashCode) +
    (stacks == null ? 0 : stacks!.hashCode) +
    (users == null ? 0 : users!.hashCode);

  @override
  String toString() => 'SyncAcknowledgeDto[activities=$activities, albumAsset=$albumAsset, albums=$albums, assets=$assets, memories=$memories, partners=$partners, people=$people, sharedLinks=$sharedLinks, stacks=$stacks, users=$users]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.activities != null) {
      json[r'activities'] = this.activities;
    } else {
    //  json[r'activities'] = null;
    }
    if (this.albumAsset != null) {
      json[r'albumAsset'] = this.albumAsset;
    } else {
    //  json[r'albumAsset'] = null;
    }
    if (this.albums != null) {
      json[r'albums'] = this.albums;
    } else {
    //  json[r'albums'] = null;
    }
    if (this.assets != null) {
      json[r'assets'] = this.assets;
    } else {
    //  json[r'assets'] = null;
    }
    if (this.memories != null) {
      json[r'memories'] = this.memories;
    } else {
    //  json[r'memories'] = null;
    }
    if (this.partners != null) {
      json[r'partners'] = this.partners;
    } else {
    //  json[r'partners'] = null;
    }
    if (this.people != null) {
      json[r'people'] = this.people;
    } else {
    //  json[r'people'] = null;
    }
    if (this.sharedLinks != null) {
      json[r'sharedLinks'] = this.sharedLinks;
    } else {
    //  json[r'sharedLinks'] = null;
    }
    if (this.stacks != null) {
      json[r'stacks'] = this.stacks;
    } else {
    //  json[r'stacks'] = null;
    }
    if (this.users != null) {
      json[r'users'] = this.users;
    } else {
    //  json[r'users'] = null;
    }
    return json;
  }

  /// Returns a new [SyncAcknowledgeDto] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SyncAcknowledgeDto? fromJson(dynamic value) {
    upgradeDto(value, "SyncAcknowledgeDto");
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      return SyncAcknowledgeDto(
        activities: mapValueOfType<String>(json, r'activities'),
        albumAsset: mapValueOfType<String>(json, r'albumAsset'),
        albums: mapValueOfType<String>(json, r'albums'),
        assets: mapValueOfType<String>(json, r'assets'),
        memories: mapValueOfType<String>(json, r'memories'),
        partners: mapValueOfType<String>(json, r'partners'),
        people: mapValueOfType<String>(json, r'people'),
        sharedLinks: mapValueOfType<String>(json, r'sharedLinks'),
        stacks: mapValueOfType<String>(json, r'stacks'),
        users: mapValueOfType<String>(json, r'users'),
      );
    }
    return null;
  }

  static List<SyncAcknowledgeDto> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SyncAcknowledgeDto>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SyncAcknowledgeDto.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SyncAcknowledgeDto> mapFromJson(dynamic json) {
    final map = <String, SyncAcknowledgeDto>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SyncAcknowledgeDto.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SyncAcknowledgeDto-objects as value to a dart map
  static Map<String, List<SyncAcknowledgeDto>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SyncAcknowledgeDto>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SyncAcknowledgeDto.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

