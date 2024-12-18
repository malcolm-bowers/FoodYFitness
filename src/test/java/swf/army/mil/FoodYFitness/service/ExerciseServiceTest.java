package swf.army.mil.FoodYFitness.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import swf.army.mil.FoodYFitness.enitity.Exercise;
import swf.army.mil.FoodYFitness.repository.ExerciseRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class ExerciseServiceTest {
    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private ExerciseService exerciseService;

    private Exercise pushups;
    private Exercise situps;
    private List<Exercise> exercises;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        pushups = new Exercise("Pushups", "Upper-Body", 0.5);
        situps = new Exercise("Situps", "Lower-Body", 0.3);
        exercises = new ArrayList<Exercise>(List.of(pushups, situps));
    }

    @Test
    void saveExerciseShouldSaveNewExercise() {
        when(exerciseRepository.save(pushups)).thenReturn(pushups);
        Exercise actualRequest = exerciseService.saveExercise(pushups);
    }

    @Test
    void fetchExercisesShouldReturnAllExercises() {
        when(exerciseRepository.findAll()).thenReturn(exercises);
        List<Exercise> listOfExerciseRequests = exerciseService.getAllExercises();
        verify(exerciseRepository, times(1)).findAll();
        assertThat(listOfExerciseRequests).isEqualTo(exercises);
    }

    @Test
    void deleteExerciseShouldDeleteExercise() {
        exerciseService.deleteExercise(1L);
        verify(exerciseRepository, times(1)).deleteById(1L);
    }

    @Test
    void updateExerciseShouldUpdateExercise() {
        Exercise currentExercise = new Exercise(
            1L, "pushups", "Upper-Body", 0.5
        );
        when(exerciseRepository.findById(currentExercise.getId())).thenReturn(Optional.of(currentExercise));
        Exercise updatedExercise = new Exercise(1L, "pushups", "Upper-Body", 0.3);
        when(exerciseRepository.save(currentExercise)).thenReturn(updatedExercise);
        Exercise result = exerciseService.updateExercise(currentExercise.getId(), updatedExercise);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(updatedExercise.getId());
        assertThat(result.getName()).isEqualTo(updatedExercise.getName());
        assertThat(result.getCalories()).isEqualTo(updatedExercise.getCalories());
    }
}