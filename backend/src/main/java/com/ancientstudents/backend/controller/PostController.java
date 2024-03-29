package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.PostNotFoundException;
import com.ancientstudents.backend.model.Post;
import com.ancientstudents.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5175/")
@RestController

public class PostController {
    @Autowired
    private PostRepository postRepository;

    @GetMapping("/post")
    List<Post> getAllPost(){
        return postRepository.findAll();
    }

    @SuppressWarnings("null")
    @PostMapping("/post")
    Post newPost(@RequestBody Post newPost){
        return postRepository.save(newPost);
    }

    @SuppressWarnings("null")
    @GetMapping("/post/{id}")
    Post getPostById(@PathVariable Long id){
        return postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
    }

    @SuppressWarnings("null")
    @PutMapping("/post/{id}")
    Post updatePost(@RequestBody Post newPost, @PathVariable Long id){
        return postRepository.findById(id)
                .map(post -> {
                    post.setTitle(newPost.getTitle());
                    post.setContent(newPost.getContent());
                    return postRepository.save(post);
                }).orElseThrow(()-> new PostNotFoundException(id));
    }

    @SuppressWarnings("null")
    @DeleteMapping("/post/{id}")
    String deletePost(@PathVariable Long id){
        if(!postRepository.existsById(id)){
            throw new PostNotFoundException(id);
        }
        postRepository.deleteById(id);
        return "User with id"+ id + " has been deleted success.";
    }
}
