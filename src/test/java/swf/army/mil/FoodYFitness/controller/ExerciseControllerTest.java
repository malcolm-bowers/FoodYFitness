package swf.army.mil.FoodYFitness.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import swf.army.mil.FoodYFitness.enitity.Exercise;
import swf.army.mil.FoodYFitness.service.ExerciseService;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ExerciseController.class)
class ExerciseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ExerciseService exerciseService;

    Exercise exercise = new Exercise("Pushups", "Upperbody", 20);

    @Test
    void shouldSaveExercise() throws Exception {
        String exerciseJson = objectMapper.writeValueAsString(exercise);

        Mockito.when(exerciseService.saveExercise(any(Exercise.class))).thenReturn(exercise);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/exercise")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(exerciseJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Pushups"))
                .andExpect(jsonPath("$.type").value("Upperbody"))
                .andExpect(jsonPath("$.calories").value(20));
        Mockito.verify(exerciseService).saveExercise(any(Exercise.class));
    }
}