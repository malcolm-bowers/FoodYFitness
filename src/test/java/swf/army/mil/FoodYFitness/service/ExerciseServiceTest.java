package swf.army.mil.FoodYFitness.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import swf.army.mil.FoodYFitness.enitity.Exercise;
import swf.army.mil.FoodYFitness.repository.ExerciseRepository;

import static org.mockito.Mockito.when;

class ExerciseServiceTest {
    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private ExerciseService exerciseService;

    private Exercise pushups;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        pushups = new Exercise("Pushups", "Upperbody", 20);
    }

    @Test
    void saveExerciseShouldSaveNewExercise() {
        when(exerciseRepository.save(pushups)).thenReturn(pushups);
        Exercise actualRequest = exerciseService.saveExercise(pushups);
    }

}