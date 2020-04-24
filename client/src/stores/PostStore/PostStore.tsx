import React, { Component, createContext } from 'react'
import { observable, computed, action, autorun } from "mobx";

class PostStore {
  // Properties
  @observable counter = 0;
  @observable posts = [];

  // Methods

  // Actions
  @action("Increasing Counter")
  increaseCount = () => {
    this.counter += 1;
  }

  @action("Setting posts")
  setPosts = (posts: any) => {
    this.posts = posts;
  }
}

export default PostStore
