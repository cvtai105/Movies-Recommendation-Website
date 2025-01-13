package org.adweb.java.collection.User;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_favorite")
public class Favorite extends WatchList{
}
