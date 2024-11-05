package swf.army.mil.FoodYFitness.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import swf.army.mil.FoodYFitness.enitity.Exercise;
import swf.army.mil.FoodYFitness.repository.ExerciseRepository;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;


    public Exercise saveExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }
}