import React, { Component, createContext } from 'react'
import { observable, computed, action, autorun } from "mobx";

class PostStore {
  // Properties  
  @observable posts = [];

  // Actions
  @action("Setting posts")
  // TODO: Proper post typing
  setPosts = (posts: any) => {
    this.posts = posts;
  }
}

export default PostStore
