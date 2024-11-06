package swf.army.mil.FoodYFitness.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swf.army.mil.FoodYFitness.enitity.Exercise;
import swf.army.mil.FoodYFitness.service.ExerciseService;

import java.util.List;

@RestController
@RequestMapping("/api/exercise")
public class ExerciseController {
    public final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @PostMapping()
    public ResponseEntity<Exercise> saveExercise(@RequestBody Exercise exercise) {
        return ResponseEntity.ok(exerciseService.saveExercise(exercise));
    }

    @GetMapping()
    public ResponseEntity<List<Exercise>> findAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }

    @DeleteMapping("/{id}")
    public void deleteExercise(@PathVariable long id) {
        exerciseService.deleteExercise(id);
    }
}
