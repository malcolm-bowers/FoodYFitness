package swf.army.mil.FoodYFitness.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import swf.army.mil.FoodYFitness.enitity.Exercise;
import swf.army.mil.FoodYFitness.service.ExerciseService;

@RestController
@RequestMapping("/api/exercise")
public class ExerciseController {
    public final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @PostMapping()
    ResponseEntity<Exercise> saveExercise(@RequestBody Exercise exercise) {
        return ResponseEntity.ok(exerciseService.saveExercise(exercise));
    }
}
